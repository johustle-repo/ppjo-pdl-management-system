<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PDL Card - {{ $formatted_name }}</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f1f5f9;
            color: #0f172a;
        }

        .wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .card {
            width: 370px;
            border: 2px solid #0f172a;
            border-radius: 12px;
            background: #fff;
            padding: 16px;
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.16);
        }

        .header {
            border-bottom: 1px solid #cbd5e1;
            margin-bottom: 12px;
            padding-bottom: 8px;
        }

        .title {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .subtitle {
            margin: 4px 0 0 0;
            font-size: 12px;
            color: #475569;
        }

        .row {
            display: grid;
            grid-template-columns: 120px 1fr;
            gap: 8px;
            margin-bottom: 7px;
            font-size: 13px;
        }

        .label {
            color: #334155;
            font-weight: 600;
        }

        .actions {
            margin-top: 14px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .btn {
            border: 1px solid #0f172a;
            background: #fff;
            color: #0f172a;
            border-radius: 6px;
            padding: 6px 10px;
            font-size: 12px;
            cursor: pointer;
        }

        .btn.primary {
            background: #0f172a;
            color: #fff;
        }

        @media print {
            body {
                background: #fff;
            }

            .actions {
                display: none;
            }

            .card {
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="card">
        <div class="header">
            <h1 class="title">PDL Identification Card</h1>
            <p class="subtitle">Preview before printing</p>
        </div>

        <div class="row"><div class="label">Name</div><div>{{ $formatted_name }}</div></div>
        <div class="row"><div class="label">Case Number</div><div>{{ $pdl->case_number }}</div></div>
        <div class="row"><div class="label">Contact Number</div><div>{{ $pdl->contact_number }}</div></div>
        <div class="row"><div class="label">Status</div><div>{{ strtoupper($pdl->status) }}</div></div>
        <div class="row"><div class="label">Transferred To</div><div>{{ $pdl->transferred_to ?: '-' }}</div></div>
        <div class="row"><div class="label">Sentence</div><div>{{ $pdl->sentence_years ? $pdl->sentence_years.' years' : '-' }}</div></div>
        <div class="row"><div class="label">Sentence Start</div><div>{{ $sentence_tracking['start_date'] ?? '-' }}</div></div>
        <div class="row"><div class="label">Sentence End</div><div>{{ $sentence_tracking['end_date'] ?? '-' }}</div></div>
        <div class="row"><div class="label">Remaining</div><div>{{ $sentence_tracking['remaining_label'] ?? '-' }}</div></div>
        <div class="row"><div class="label">Alias</div><div>{{ $pdl->alias ?: '-' }}</div></div>
        <div class="row"><div class="label">Remarks</div><div>{{ $pdl->remarks ?: '-' }}</div></div>

        <div class="actions">
            <button class="btn primary" onclick="window.print()">Print Card</button>
            <button class="btn" onclick="window.close()">Close</button>
        </div>
    </div>
</div>
</body>
</html>
