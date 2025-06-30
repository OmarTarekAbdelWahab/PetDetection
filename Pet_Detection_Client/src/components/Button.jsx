function Button(props) {
  return (
    <button
      type={props.isSubmit ? "submit" : "button"}
      className={`w-full font-medium py-3 px-6 rounded-lg transition duration-200 mt-4 ${
        props.disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-primary hover:bg-primaryDark text-white cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5'
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

export default Button;
