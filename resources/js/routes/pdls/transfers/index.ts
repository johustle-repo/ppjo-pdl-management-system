import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/transfers/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PdlController::exportMethod
 * @see app/Http/Controllers/PdlController.php:637
 * @route '/transfers/export'
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
const transfers = {
    export: Object.assign(exportMethod, exportMethod),
}

export default transfers