function Button(props) {
  return (
    <button
      type={props.isSubmit ? "submit" : "button"}
      className="w-full bg-primary hover:bg-primaryDark text-white font-medium py-2 rounded-lg transition duration-200 mt-4 cursor-pointer"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
