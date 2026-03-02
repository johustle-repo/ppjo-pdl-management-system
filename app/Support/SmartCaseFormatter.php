<?php

namespace App\Support;

class SmartCaseFormatter
{
    /**
     * Keep known acronyms uppercase while title-casing other words.
     */
    public static function title(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $normalized = preg_replace('/\s+/', ' ', trim($value));

        if (! is_string($normalized) || $normalized === '') {
            return $normalized;
        }

        $acronyms = ['RTC', 'PNP', 'BJMP', 'DOJ'];
        $words = preg_split('/\s+/', $normalized) ?: [];

        $converted = array_map(function (string $word) use ($acronyms): string {
            $upper = mb_strtoupper($word);

            if (in_array($upper, $acronyms, true)) {
                return $upper;
            }

            return mb_convert_case(mb_strtolower($word), MB_CASE_TITLE, 'UTF-8');
        }, $words);

        return implode(' ', $converted);
    }
}
