/**
 * handle error
 * @param error
 */
function handleError(error: any) {
  return {
    code: null,
    result: null,
    message: error,
  }
}

/**
 * try...catch...
 */
export default function CatchAPI() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args)
        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          return result.catch(handleError)
        }
        return result
      } catch (error) {
        return handleError(error)
      }
    }
    return descriptor
  }
}
