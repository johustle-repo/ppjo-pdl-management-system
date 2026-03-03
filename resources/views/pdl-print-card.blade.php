<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PDL Card - {{ $formatted_name }}</title>
    <style>
        :root {
            --navy-950: #081a3a;
            --navy-900: #0b2858;
            --navy-700: #1d4ed8;
            --slate-900: #0f172a;
            --slate-700: #334155;
            --slate-500: #64748b;
            --slate-200: #e2e8f0;
            --bg: #e2e8f0;
            --white: #ffffff;
            --danger: #b91c1c;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background: var(--bg);
            color: var(--slate-900);
        }

        .wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .card {
            width: 856px;
            max-width: 100%;
            border-radius: 16px;
            overflow: hidden;
            border: 2px solid var(--navy-950);
            background: var(--white);
            box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
        }

        .card-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            background: linear-gradient(120deg, var(--navy-950), var(--navy-900));
            color: var(--white);
            padding: 14px 18px;
        }

        .title {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .subtitle {
            margin: 2px 0 0;
            font-size: 13px;
            color: #c7d2fe;
        }

        .badge {
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.4px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            background: rgba(255, 255, 255, 0.12);
            text-transform: uppercase;
            white-space: nowrap;
        }

        .body {
            display: grid;
            grid-template-columns: 220px 1fr;
            gap: 18px;
            padding: 16px 18px 12px;
        }

        .photo-box {
            border: 1px solid var(--slate-200);
            border-radius: 12px;
            padding: 10px;
            background: #f8fafc;
        }

        .photo {
            width: 100%;
            aspect-ratio: 3 / 4;
            border-radius: 10px;
            object-fit: cover;
            border: 1px solid #cbd5e1;
            background: #dbeafe;
        }

        .photo-fallback {
            width: 100%;
            aspect-ratio: 3 / 4;
            border-radius: 10px;
            border: 1px dashed #93c5fd;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 13px;
            color: #1e40af;
            background: #eff6ff;
            font-weight: 600;
            padding: 8px;
        }

        .note {
            margin-top: 8px;
            font-size: 11px;
            color: var(--slate-500);
            line-height: 1.35;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 8px 10px;
            align-content: start;
            font-size: 18px;
            line-height: 1.3;
        }

        .label {
            color: var(--slate-700);
            font-weight: 600;
            white-space: nowrap;
        }

        .value {
            color: var(--slate-900);
            word-break: break-word;
        }

        .name {
            color: var(--navy-950);
            font-size: 21px;
            font-weight: 800;
            margin-bottom: 2px;
            letter-spacing: 0.2px;
        }

        .remarks {
            grid-column: 1 / -1;
            margin-top: 4px;
            padding-top: 8px;
            border-top: 1px solid var(--slate-200);
            font-size: 16px;
        }

        .footer {
            border-top: 1px solid var(--slate-200);
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            padding: 10px 18px;
            font-size: 12px;
            color: var(--slate-500);
        }

        .footer strong {
            color: var(--slate-700);
        }

        .actions {
            margin-top: 16px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .btn {
            border: 1px solid var(--slate-700);
            background: var(--white);
            color: var(--slate-900);
            border-radius: 8px;
            padding: 8px 14px;
            font-size: 13px;
            cursor: pointer;
        }

        .btn.primary {
            background: var(--navy-950);
            color: var(--white);
            border-color: var(--navy-950);
        }

        .status-active { color: #166534; font-weight: 700; }
        .status-released { color: var(--danger); font-weight: 700; }
        .status-transferred { color: #1d4ed8; font-weight: 700; }
        .status-transfered { color: #1d4ed8; font-weight: 700; }

        @page {
            size: 86mm 54mm;
            margin: 0;
        }

        @media (max-width: 920px) {
            .card { width: 100%; }
            .body { grid-template-columns: 1fr; }
            .photo-box { max-width: 220px; }
            .info-grid { font-size: 16px; }
        }

        @media print {
            body {
                background: var(--white);
            }

            .wrapper {
                min-height: auto;
                padding: 0;
            }

            .card {
                box-shadow: none;
                width: 86mm;
                height: 54mm;
                border-width: 1px;
                border-radius: 0;
            }

            .actions {
                display: none !important;
            }

            .card-head {
                padding: 2mm 3mm;
            }

            .title {
                font-size: 10px;
                letter-spacing: 0.6px;
            }

            .subtitle,
            .badge {
                font-size: 7px;
            }

            .body {
                grid-template-columns: 23mm 1fr;
                gap: 2.5mm;
                padding: 2.5mm 3mm 1.5mm;
            }

            .photo-box {
                padding: 1mm;
                border-radius: 1.5mm;
            }

            .photo,
            .photo-fallback {
                border-radius: 1mm;
                font-size: 6px;
            }

            .note {
                margin-top: 1mm;
                font-size: 5.5px;
            }

            .info-grid {
                grid-template-columns: 22mm 1fr;
                gap: 0.8mm 1.2mm;
                font-size: 6.4px;
                line-height: 1.25;
            }

            .name {
                font-size: 7.2px;
                margin-bottom: 0;
            }

            .remarks {
                margin-top: 0.5mm;
                padding-top: 0.8mm;
                font-size: 6px;
            }

            .footer {
                padding: 1mm 3mm;
                font-size: 5.3px;
            }
        }
    </style>
</head>
<body>
<div class="wrapper">
    <div>
        <div class="card">
            <div class="card-head">
                <div>
                    <h1 class="title">PDL Identification Card</h1>
                    <p class="subtitle">Pangasinan Provincial Jail Office</p>
                </div>
                <div class="badge">Case {{ $pdl->case_number }}</div>
            </div>

            <div class="body">
                <div class="photo-box">
                    @if (!empty($profile_photo_url))
                        <img class="photo" src="{{ $profile_photo_url }}" alt="PDL Photo">
                    @else
                        <div class="photo-fallback">No Profile Photo</div>
                    @endif
                    <div class="note">
                        Holder must present this card when requested by authorized officers.
                    </div>
                </div>

                <div class="info-grid">
                    <div class="label">Name</div>
                    <div class="value name">{{ $formatted_name }}</div>

                    <div class="label">Status</div>
                    <div class="value status-{{ strtolower((string) $pdl->status) }}">{{ strtoupper((string) $pdl->status) }}</div>

                    <div class="label">Contact No.</div>
                    <div class="value">{{ $pdl->contact_number ?: '-' }}</div>

                    <div class="label">Alias</div>
                    <div class="value">{{ $pdl->alias ?: '-' }}</div>

                    <div class="label">Transferred To</div>
                    <div class="value">{{ $pdl->transferred_to ?: '-' }}</div>

                    <div class="label">Sentence</div>
                    <div class="value">{{ $pdl->sentence_years ? $pdl->sentence_years.' years' : '-' }}</div>

                    <div class="label">Start</div>
                    <div class="value">{{ $sentence_tracking['start_date'] ?? '-' }}</div>

                    <div class="label">End</div>
                    <div class="value">{{ $sentence_tracking['end_date'] ?? '-' }}</div>

                    <div class="label">Remaining</div>
                    <div class="value">{{ $sentence_tracking['remaining_label'] ?? '-' }}</div>

                    <div class="remarks">
                        <span class="label">Remarks:</span>
                        <span class="value">{{ $pdl->remarks ?: '-' }}</span>
                    </div>
                </div>
            </div>

            <div class="footer">
                <div><strong>ID:</strong> {{ $pdl->id }}</div>
                <div><strong>Printed:</strong> {{ now()->format('Y-m-d H:i') }}</div>
            </div>
        </div>

        <div class="actions">
            <button class="btn primary" onclick="window.print()">Print Card</button>
            <button class="btn" onclick="window.close()">Close</button>
        </div>
    </div>
</div>
</body>
</html>
