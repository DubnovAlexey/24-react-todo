const root = ReactDOM.createRoot(document.getElementById('root'));

function CheckBox() {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div>
      <input
        type={'checkbox'}
        defaultChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <p>{isChecked ? 'checked' : 'unchecked'}</p>
    </div>
  )
}

root.render(<CheckBox />);