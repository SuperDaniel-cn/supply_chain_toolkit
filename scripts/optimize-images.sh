#!/bin/sh
# Pre-encode landing screenshots for the Vercel site and GitHub README.
# Drop replacement PNGs next to the existing files, then rerun this script.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/public"
CHARTS="$PUBLIC/charts"
MAX_WIDTH=1920
QUALITY=80

encode_webp() {
  src=$1
  dest=$2
  width=$3
  src_width=$(sips -g pixelWidth "$src" | awk '/pixelWidth/{print $2}')
  if [ "$src_width" -gt "$width" ]; then
    cwebp -quiet -q "$QUALITY" -m 6 -resize "$width" 0 "$src" -o "$dest"
  else
    cwebp -quiet -q "$QUALITY" -m 6 "$src" -o "$dest"
  fi
}

if [ -f "$PUBLIC/hero.png" ]; then
  encode_webp "$PUBLIC/hero.png" "$PUBLIC/hero.webp" "$MAX_WIDTH"
  magick "$PUBLIC/hero.png" -resize '1200x630^' -gravity North -extent 1200x630 -strip -quality 78 "$PUBLIC/og.jpg"
  rm -f "$PUBLIC/hero.png"
fi

if [ -f "$PUBLIC/app-logo.png" ]; then
  cwebp -quiet -q 85 -m 6 -resize 128 128 "$PUBLIC/app-logo.png" -o "$PUBLIC/app-logo.webp"
  rm -f "$PUBLIC/app-logo.png"
fi

for src in "$CHARTS"/*.png; do
  [ -f "$src" ] || continue
  base=$(basename "$src" .png)
  encode_webp "$src" "$CHARTS/$base.webp" "$MAX_WIDTH"
  rm -f "$src"
done

printf 'Encoded landing images in %s\n' "$PUBLIC"
ls -lh "$PUBLIC"/*.webp "$PUBLIC/og.jpg" "$CHARTS"/*.webp
