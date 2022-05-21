export function FormInputField(props) {
    
    return (
        <input
            style={{maxWidth: '90vw'}}
            type="text"
            className={`rounded-3xl px-4 py-1 mb-4 ${props.classExtra}`}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
        />
    )
}
