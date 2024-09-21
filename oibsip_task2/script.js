document.getElementById("quoteButton").addEventListener("click", function() {
    const quotes = [
        "When something is important enough, you do it even if the odds are not in your favor.",
        "I think it's possible for ordinary people to choose to be extraordinary.",
        "Some people don't like change, but you need to embrace change if the alternative is disaster.",
        "Persistence is very important. You should not give up unless you are forced to give up.",
        "The first step is to establish that something is possible; then probability will occur.",
        "I could either watch it happen or be a part of it.",
        "You shouldn't do things differently just because they're different. They need to be... better.",
        "If you get up in the morning and think the future is going to be better, it is a bright day. Otherwise, it's not.",
        "Great companies are built on great products.",
        "You have to be very driven and not give up. You have to be flexible. You have to be able to deal with failure."
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText = quotes[randomIndex];
});
