export default function EmojiButton ({ content, handleClick, selectedCardEntry, matchedCardEntry}) {

    const btnContent = selectedCardEntry || matchedCardEntry ? content : "?"

    const btnStyle = matchedCardEntry ? "btn--emoji__back--matched":
        selectedCardEntry ? "btn--emohi__back--matched":
        "btn--emohi__font"

    return (
        <button
          className={`btn btn--emoji ${btnStyle}`}
          onClick={handleClick}
        >
            {btnContent}
        </button>
    )
};
