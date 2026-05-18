import { createClient } from '@supabase/supabase-js';
import { COUNTRIES } from '@/lib/countries';
import { NextResponse } from 'next/server';

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('sticker_ownership')
    .select('country_code, sticker_number, user_name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = {};
  COUNTRIES.forEach(country => {
    result[country.code] = {};
    for (let i = 1; i <= country.count; i++) {
      result[country.code][i] = [];
    }
  });

  data.forEach(row => {
    if (result[row.country_code]?.[row.sticker_number] !== undefined) {
      result[row.country_code][row.sticker_number].push(row.user_name);
    }
  });

  return NextResponse.json(result);
}

export async function POST(request) {
  const supabase = getSupabase();
  const { countryCode, stickerNumber, owners } = await request.json();

  const { error: deleteError } = await supabase
    .from('sticker_ownership')
    .delete()
    .eq('country_code', countryCode)
    .eq('sticker_number', stickerNumber);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  if (owners.length > 0) {
    const rows = owners.map(user => ({
      country_code: countryCode,
      sticker_number: stickerNumber,
      user_name: user,
    }));

    const { error: insertError } = await supabase
      .from('sticker_ownership')
      .insert(rows);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
