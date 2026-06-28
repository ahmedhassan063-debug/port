window.onload = function() {
    let div = document.createElement("div");
    div.className = "info";
    div.innerHTML = "<h1>Ahmed's Portfolio</h1>\n" +
        "<p>Engineering student at Cairo University,Junior web-developer available for hiring</p>";
    document.body.prepend(div);
}


document.querySelector(".skills").onclick = function() {
    const all = document.querySelector(".all");
    all.style.display = "flex";
    all.classList.remove("hide");
    all.classList.add("show");
}