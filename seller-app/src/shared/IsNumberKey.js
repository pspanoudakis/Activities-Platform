export default function IsNumberKey(e, setState) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        setState(e.target.value)
    }
}
