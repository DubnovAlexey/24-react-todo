const root = ReactDOM.createRoot(document.getElementById('root'));

const Student = ({name, age}) => {
    return (
        <div>
            <h1>{name}</h1>
            <h2>age: {age ?? 'hidden'}</h2>
        </div>
    )
}

root.render(
    <div>
        <Student name={"John"} age={20}/>
        <Student name={'Peter'} age={25}/>
        <Student name={'Mary'}/>
    </div>
);