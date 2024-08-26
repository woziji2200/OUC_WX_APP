import { app } from '..'
import * as interfaces from '../interfaces/interfaces'
export function registerRouter(data: interfaces.registerRouterParams) {
    // app[data.method as string](data.path, data.handler)
    if(data.method == 'get'){
        app.get(data.path, data.handler)
    } else if(data.method == 'post'){
        app.post(data.path, data.handler)
    }
}