import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import sentenceTrackerBb1c65 from './sentence-tracker'
import transfersB7d45c from './transfers'
import courtCalendar2db00a from './court-calendar'
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
* @see \App\Http\Controllers\PdlController::print
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
export const print = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/pdls/{pdl}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::print
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
print.url = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return print.definition.url
            .replace('{pdl}', parsedArgs.pdl.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::print
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
print.get = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::print
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
print.head = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::print
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
    const printForm = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: print.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::print
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
        printForm.get = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::print
 * @see app/Http/Controllers/PdlController.php:1171
 * @route '/pdls/{pdl}/print'
 */
        printForm.head = (args: { pdl: number | { id: number } } | [pdl: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    print.form = printForm
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
const pdls = {
    profiles: Object.assign(profiles, profiles),
sentenceTracker: Object.assign(sentenceTracker, sentenceTrackerBb1c65),
transfers: Object.assign(transfers, transfersB7d45c),
courtCalendar: Object.assign(courtCalendar, courtCalendar2db00a),
export: Object.assign(exportMethod, exportMethod),
print: Object.assign(print, print),
store: Object.assign(store, store),
update: Object.assign(update, update),
bulkUpdate: Object.assign(bulkUpdate, bulkUpdate),
}

export default pdls