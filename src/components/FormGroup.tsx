export function FormGroup(props: React.HTMLProps<HTMLDivElement>) {
    return <div className="flex gap-1" {...props}>{props.children}</div>
}