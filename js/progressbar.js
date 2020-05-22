class ProgressBar {
  constructor(parent_id) {
    //value in Prozent
    this.parent = document.getElementById(parent_id);
    this.bar = document.createElement("div");
    this.parent.innerHTML = ""; //Empty parent
    this.parent.appendChild(this.bar);
    this.setValue(25);
  }

  setValue = (value) => {
    this.value = value;
    this.bar.style.width = value + "%";
  };
}
