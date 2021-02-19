function debounce(fn, wait = 500, immediate = true) {
    let timer, result;
    let debounced =  function(...args) {
        if(timer) {
            clearTimeout(timer)
        }
        if(immediate) {
            let callnow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if(callnow) {
                result = fn.apply(this, args)
            }
        } else {
            setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
        return result
    }
    debounced.cancel = function() {
        clearTimeout(timer)
    }
}