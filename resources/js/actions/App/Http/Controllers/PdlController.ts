import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PdlController::index
 * @see app/Http/Controllers/PdlController.php:29
 * @route '/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::index
 * @see app/Http/Controllers/PdlController.php:29
 * @route '/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::index
 * @see app/Http/Controllers/PdlController.php:29
 * @route '/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::index
 * @see app/Http/Controllers/PdlController.php:29
 * @route '/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::index
 * @see app/Http/Controllers/PdlController.php:29
 * @route '/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::index
 * @see app/Http/Controllers/PdlController.php:29
 * @route '/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::index
 * @see app/Http/Controllers/PdlController.php:29
 * @route '/dashboard'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\PdlController::notifications
 * @see app/Http/Controllers/PdlController.php:304
 * @route '/notifications'
 */
export const notifications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

notifications.definition = {
    methods: ["get","head"],
    url: '/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::notifications
 * @see app/Http/Controllers/PdlController.php:304
 * @route '/notifications'
 */
notifications.url = (options?: RouteQueryOptions) => {
    return notifications.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::notifications
 * @see app/Http/Controllers/PdlController.php:304
 * @route '/notifications'
 */
notifications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::notifications
 * @see app/Http/Controllers/PdlController.php:304
 * @route '/notifications'
 */
notifications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notifications.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::notifications
 * @see app/Http/Controllers/PdlController.php:304
 * @route '/notifications'
 */
    const notificationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: notifications.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::notifications
 * @see app/Http/Controllers/PdlController.php:304
 * @route '/notifications'
 */
        notificationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notifications.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::notifications
 * @see app/Http/Controllers/PdlController.php:304
 * @route '/notifications'
 */
        notificationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notifications.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    notifications.form = notificationsForm
/**
* @see \App\Http\Controllers\PdlController::profiles
 * @see app/Http/Controllers/PdlController.php:92
 * @route '/pdl-profiles'
 */
export const profiles = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profiles.url(options),
    method: 'get',
})

profiles.definition = {
    methods: ["get","head"],
    url: '/pdl-profiles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::profiles
 * @see app/Http/Controllers/PdlController.php:92
 * @route '/pdl-profiles'
 */
profiles.url = (options?: RouteQueryOptions) => {
    return profiles.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::profiles
 * @see app/Http/Controllers/PdlController.php:92
 * @route '/pdl-profiles'
 */
profiles.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profiles.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::profiles
 * @see app/Http/Controllers/PdlController.php:92
 * @route '/pdl-profiles'
 */
profiles.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profiles.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::profiles
 * @see app/Http/Controllers/PdlController.php:92
 * @route '/pdl-profiles'
 */
    const profilesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profiles.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::profiles
 * @see app/Http/Controllers/PdlController.php:92
 * @route '/pdl-profiles'
 */
        profilesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profiles.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::profiles
 * @see app/Http/Controllers/PdlController.php:92
 * @route '/pdl-profiles'
 */
        profilesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profiles.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profiles.form = profilesForm
/**
* @see \App\Http\Controllers\PdlController::sentenceTracker
 * @see app/Http/Controllers/PdlController.php:200
 * @route '/sentence-tracker'
 */
export const sentenceTracker = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sentenceTracker.url(options),
    method: 'get',
})

sentenceTracker.definition = {
    methods: ["get","head"],
    url: '/sentence-tracker',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::sentenceTracker
 * @see app/Http/Controllers/PdlController.php:200
 * @route '/sentence-tracker'
 */
sentenceTracker.url = (options?: RouteQueryOptions) => {
    return sentenceTracker.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::sentenceTracker
 * @see app/Http/Controllers/PdlController.php:200
 * @route '/sentence-tracker'
 */
sentenceTracker.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sentenceTracker.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::sentenceTracker
 * @see app/Http/Controllers/PdlController.php:200
 * @route '/sentence-tracker'
 */
sentenceTracker.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sentenceTracker.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::sentenceTracker
 * @see app/Http/Controllers/PdlController.php:200
 * @route '/sentence-tracker'
 */
    const sentenceTrackerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sentenceTracker.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::sentenceTracker
 * @see app/Http/Controllers/PdlController.php:200
 * @route '/sentence-tracker'
 */
        sentenceTrackerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sentenceTracker.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::sentenceTracker
 * @see app/Http/Controllers/PdlController.php:200
 * @route '/sentence-tracker'
 */
        sentenceTrackerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sentenceTracker.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sentenceTracker.form = sentenceTrackerForm
/**
* @see \App\Http\Controllers\PdlController::exportSentenceTracker
 * @see app/Http/Controllers/PdlController.php:451
 * @route '/sentence-tracker/export'
 */
export const exportSentenceTracker = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSentenceTracker.url(options),
    method: 'get',
})

exportSentenceTracker.definition = {
    methods: ["get","head"],
    url: '/sentence-tracker/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportSentenceTracker
 * @see app/Http/Controllers/PdlController.php:451
 * @route '/sentence-tracker/export'
 */
exportSentenceTracker.url = (options?: RouteQueryOptions) => {
    return exportSentenceTracker.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportSentenceTracker
 * @see app/Http/Controllers/PdlController.php:451
 * @route '/sentence-tracker/export'
 */
exportSentenceTracker.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSentenceTracker.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportSentenceTracker
 * @see app/Http/Controllers/PdlController.php:451
 * @route '/sentence-tracker/export'
 */
exportSentenceTracker.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportSentenceTracker.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportSentenceTracker
 * @see app/Http/Controllers/PdlController.php:451
 * @route '/sentence-tracker/export'
 */
    const exportSentenceTrackerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportSentenceTracker.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportSentenceTracker
 * @see app/Http/Controllers/PdlController.php:451
 * @route '/sentence-tracker/export'
 */
        exportSentenceTrackerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportSentenceTracker.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportSentenceTracker
 * @see app/Http/Controllers/PdlController.php:451
 * @route '/sentence-tracker/export'
 */
        exportSentenceTrackerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportSentenceTracker.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportSentenceTracker.form = exportSentenceTrackerForm
/**
* @see \App\Http\Controllers\PdlController::transfers
 * @see app/Http/Controllers/PdlController.php:523
 * @route '/transfers'
 */
export const transfers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transfers.url(options),
    method: 'get',
})

transfers.definition = {
    methods: ["get","head"],
    url: '/transfers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::transfers
 * @see app/Http/Controllers/PdlController.php:523
 * @route '/transfers'
 */
transfers.url = (options?: RouteQueryOptions) => {
    return transfers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::transfers
 * @see app/Http/Controllers/PdlController.php:523
 * @route '/transfers'
 */
transfers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transfers.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::transfers
 * @see app/Http/Controllers/PdlController.php:523
 * @route '/transfers'
 */
transfers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transfers.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::transfers
 * @see app/Http/Controllers/PdlController.php:523
 * @route '/transfers'
 */
    const transfersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transfers.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::transfers
 * @see app/Http/Controllers/PdlController.php:523
 * @route '/transfers'
 */
        transfersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transfers.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::transfers
 * @see app/Http/Controllers/PdlController.php:523
 * @route '/transfers'
 */
        transfersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transfers.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transfers.form = transfersForm
/**
* @see \App\Http\Controllers\PdlController::exportTransfers
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
export const exportTransfers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransfers.url(options),
    method: 'get',
})

exportTransfers.definition = {
    methods: ["get","head"],
    url: '/transfers/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportTransfers
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
exportTransfers.url = (options?: RouteQueryOptions) => {
    return exportTransfers.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportTransfers
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
exportTransfers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTransfers.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportTransfers
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
exportTransfers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTransfers.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportTransfers
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
    const exportTransfersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportTransfers.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportTransfers
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
        exportTransfersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransfers.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportTransfers
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
        exportTransfersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTransfers.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportTransfers.form = exportTransfersForm
/**
* @see \App\Http\Controllers\PdlController::courtCalendar
 * @see app/Http/Controllers/PdlController.php:703
 * @route '/court-calendar'
 */
export const courtCalendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courtCalendar.url(options),
    method: 'get',
})

courtCalendar.definition = {
    methods: ["get","head"],
    url: '/court-calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::courtCalendar
 * @see app/Http/Controllers/PdlController.php:703
 * @route '/court-calendar'
 */
courtCalendar.url = (options?: RouteQueryOptions) => {
    return courtCalendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::courtCalendar
 * @see app/Http/Controllers/PdlController.php:703
 * @route '/court-calendar'
 */
courtCalendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courtCalendar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::courtCalendar
 * @see app/Http/Controllers/PdlController.php:703
 * @route '/court-calendar'
 */
courtCalendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: courtCalendar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::courtCalendar
 * @see app/Http/Controllers/PdlController.php:703
 * @route '/court-calendar'
 */
    const courtCalendarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: courtCalendar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::courtCalendar
 * @see app/Http/Controllers/PdlController.php:703
 * @route '/court-calendar'
 */
        courtCalendarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courtCalendar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::courtCalendar
 * @see app/Http/Controllers/PdlController.php:703
 * @route '/court-calendar'
 */
        courtCalendarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courtCalendar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    courtCalendar.form = courtCalendarForm
/**
* @see \App\Http\Controllers\PdlController::exportCourtCalendar
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
export const exportCourtCalendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCourtCalendar.url(options),
    method: 'get',
})

exportCourtCalendar.definition = {
    methods: ["get","head"],
    url: '/court-calendar/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportCourtCalendar
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
exportCourtCalendar.url = (options?: RouteQueryOptions) => {
    return exportCourtCalendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportCourtCalendar
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
exportCourtCalendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCourtCalendar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportCourtCalendar
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
exportCourtCalendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCourtCalendar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportCourtCalendar
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
    const exportCourtCalendarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportCourtCalendar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportCourtCalendar
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
        exportCourtCalendarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCourtCalendar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportCourtCalendar
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
        exportCourtCalendarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportCourtCalendar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportCourtCalendar.form = exportCourtCalendarForm
/**
* @see \App\Http\Controllers\PdlController::reports
 * @see app/Http/Controllers/PdlController.php:1103
 * @route '/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::reports
 * @see app/Http/Controllers/PdlController.php:1103
 * @route '/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::reports
 * @see app/Http/Controllers/PdlController.php:1103
 * @route '/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::reports
 * @see app/Http/Controllers/PdlController.php:1103
 * @route '/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::reports
 * @see app/Http/Controllers/PdlController.php:1103
 * @route '/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::reports
 * @see app/Http/Controllers/PdlController.php:1103
 * @route '/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::reports
 * @see app/Http/Controllers/PdlController.php:1103
 * @route '/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
/**
* @see \App\Http\Controllers\PdlController::exportReports
 * @see app/Http/Controllers/PdlController.php:1118
 * @route '/reports/export'
 */
export const exportReports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportReports.url(options),
    method: 'get',
})

exportReports.definition = {
    methods: ["get","head"],
    url: '/reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportReports
 * @see app/Http/Controllers/PdlController.php:1118
 * @route '/reports/export'
 */
exportReports.url = (options?: RouteQueryOptions) => {
    return exportReports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportReports
 * @see app/Http/Controllers/PdlController.php:1118
 * @route '/reports/export'
 */
exportReports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportReports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportReports
 * @see app/Http/Controllers/PdlController.php:1118
 * @route '/reports/export'
 */
exportReports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportReports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportReports
 * @see app/Http/Controllers/PdlController.php:1118
 * @route '/reports/export'
 */
    const exportReportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportReports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportReports
 * @see app/Http/Controllers/PdlController.php:1118
 * @route '/reports/export'
 */
        exportReportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportReports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportReports
 * @see app/Http/Controllers/PdlController.php:1118
 * @route '/reports/export'
 */
        exportReportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportReports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportReports.form = exportReportsForm
/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:1048
 * @route '/pdls/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/pdls/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:1048
 * @route '/pdls/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:1048
 * @route '/pdls/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:1048
 * @route '/pdls/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:1048
 * @route '/pdls/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:1048
 * @route '/pdls/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:1048
 * @route '/pdls/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\PdlController::printCard
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
export const printCard = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printCard.url(args, options),
    method: 'get',
})

printCard.definition = {
    methods: ["get","head"],
    url: '/pdls/{pdl}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::printCard
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
printCard.url = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pdl: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pdl: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pdl: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pdl: typeof args.pdl === 'object'
                ? args.pdl.id
                : args.pdl,
                }

    return printCard.definition.url
            .replace('{pdl}', parsedArgs.pdl.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::printCard
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
printCard.get = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printCard.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::printCard
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
printCard.head = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: printCard.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::printCard
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
    const printCardForm = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: printCard.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::printCard
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
        printCardForm.get = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: printCard.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::printCard
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
        printCardForm.head = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: printCard.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    printCard.form = printCardForm
/**
* @see \App\Http\Controllers\PdlController::backupTools
 * @see app/Http/Controllers/PdlController.php:380
 * @route '/backup-tools'
 */
export const backupTools = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: backupTools.url(options),
    method: 'get',
})

backupTools.definition = {
    methods: ["get","head"],
    url: '/backup-tools',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::backupTools
 * @see app/Http/Controllers/PdlController.php:380
 * @route '/backup-tools'
 */
backupTools.url = (options?: RouteQueryOptions) => {
    return backupTools.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::backupTools
 * @see app/Http/Controllers/PdlController.php:380
 * @route '/backup-tools'
 */
backupTools.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: backupTools.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::backupTools
 * @see app/Http/Controllers/PdlController.php:380
 * @route '/backup-tools'
 */
backupTools.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: backupTools.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::backupTools
 * @see app/Http/Controllers/PdlController.php:380
 * @route '/backup-tools'
 */
    const backupToolsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: backupTools.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::backupTools
 * @see app/Http/Controllers/PdlController.php:380
 * @route '/backup-tools'
 */
        backupToolsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: backupTools.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::backupTools
 * @see app/Http/Controllers/PdlController.php:380
 * @route '/backup-tools'
 */
        backupToolsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: backupTools.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    backupTools.form = backupToolsForm
/**
* @see \App\Http\Controllers\PdlController::exportBackup
 * @see app/Http/Controllers/PdlController.php:390
 * @route '/backup-tools/export'
 */
export const exportBackup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportBackup.url(options),
    method: 'get',
})

exportBackup.definition = {
    methods: ["get","head"],
    url: '/backup-tools/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportBackup
 * @see app/Http/Controllers/PdlController.php:390
 * @route '/backup-tools/export'
 */
exportBackup.url = (options?: RouteQueryOptions) => {
    return exportBackup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportBackup
 * @see app/Http/Controllers/PdlController.php:390
 * @route '/backup-tools/export'
 */
exportBackup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportBackup.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportBackup
 * @see app/Http/Controllers/PdlController.php:390
 * @route '/backup-tools/export'
 */
exportBackup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportBackup.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportBackup
 * @see app/Http/Controllers/PdlController.php:390
 * @route '/backup-tools/export'
 */
    const exportBackupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportBackup.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportBackup
 * @see app/Http/Controllers/PdlController.php:390
 * @route '/backup-tools/export'
 */
        exportBackupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportBackup.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportBackup
 * @see app/Http/Controllers/PdlController.php:390
 * @route '/backup-tools/export'
 */
        exportBackupForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportBackup.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportBackup.form = exportBackupForm
/**
* @see \App\Http\Controllers\PdlController::store
 * @see app/Http/Controllers/PdlController.php:829
 * @route '/pdls'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pdls',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PdlController::store
 * @see app/Http/Controllers/PdlController.php:829
 * @route '/pdls'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::store
 * @see app/Http/Controllers/PdlController.php:829
 * @route '/pdls'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PdlController::store
 * @see app/Http/Controllers/PdlController.php:829
 * @route '/pdls'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PdlController::store
 * @see app/Http/Controllers/PdlController.php:829
 * @route '/pdls'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PdlController::update
 * @see app/Http/Controllers/PdlController.php:892
 * @route '/pdls/{pdl}'
 */
export const update = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/pdls/{pdl}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PdlController::update
 * @see app/Http/Controllers/PdlController.php:892
 * @route '/pdls/{pdl}'
 */
update.url = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pdl: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pdl: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pdl: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pdl: typeof args.pdl === 'object'
                ? args.pdl.id
                : args.pdl,
                }

    return update.definition.url
            .replace('{pdl}', parsedArgs.pdl.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::update
 * @see app/Http/Controllers/PdlController.php:892
 * @route '/pdls/{pdl}'
 */
update.put = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PdlController::update
 * @see app/Http/Controllers/PdlController.php:892
 * @route '/pdls/{pdl}'
 */
    const updateForm = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PdlController::update
 * @see app/Http/Controllers/PdlController.php:892
 * @route '/pdls/{pdl}'
 */
        updateForm.put = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\PdlController::bulkUpdate
 * @see app/Http/Controllers/PdlController.php:976
 * @route '/pdls/bulk-update'
 */
export const bulkUpdate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdate.url(options),
    method: 'post',
})

bulkUpdate.definition = {
    methods: ["post"],
    url: '/pdls/bulk-update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PdlController::bulkUpdate
 * @see app/Http/Controllers/PdlController.php:976
 * @route '/pdls/bulk-update'
 */
bulkUpdate.url = (options?: RouteQueryOptions) => {
    return bulkUpdate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::bulkUpdate
 * @see app/Http/Controllers/PdlController.php:976
 * @route '/pdls/bulk-update'
 */
bulkUpdate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PdlController::bulkUpdate
 * @see app/Http/Controllers/PdlController.php:976
 * @route '/pdls/bulk-update'
 */
    const bulkUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkUpdate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PdlController::bulkUpdate
 * @see app/Http/Controllers/PdlController.php:976
 * @route '/pdls/bulk-update'
 */
        bulkUpdateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkUpdate.url(options),
            method: 'post',
        })
    
    bulkUpdate.form = bulkUpdateForm
const PdlController = { index, notifications, profiles, sentenceTracker, exportSentenceTracker, transfers, exportTransfers, courtCalendar, exportCourtCalendar, reports, exportReports, exportMethod, printCard, backupTools, exportBackup, store, update, bulkUpdate, export: exportMethod }

export default PdlController