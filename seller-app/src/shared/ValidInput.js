export function isNumberKey(e, setState) {
    const re = /^\d*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       setState(e.target.value)
    }
}

export function isTimeKey(e, setState) {
    const re = /^\d{0,2}:?\d{0,2}$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       setState(e.target.value)
    }
}

export function isDateKey(e, setState) {
    const re = /^\d{0,2}\/?\d{0,2}\/?\d{0,4}$/;
    if (e.target.value === '' || re.test(e.target.value)) {
       setState(e.target.value)
    }
}
