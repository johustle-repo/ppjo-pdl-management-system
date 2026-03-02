import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/court-calendar/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:775
 * @route '/court-calendar/export'
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
const courtCalendar = {
    export: Object.assign(exportMethod, exportMethod),
}

export default courtCalendar