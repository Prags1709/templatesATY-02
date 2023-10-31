const scroll_content = document.querySelector(".attryb-carousel-002-card-holder");
const card_container = document.querySelector(".attryb-carousel-002-card-box-1");
const left_scroll_button = document.querySelector(".attryb-carousel-002-button-left");
const right_scroll_button = document.querySelector(".attryb-carousel-002-button-right");
const left_svg_logo = document.querySelector(".attryb-carousel-002-button-left > svg path");
const right_svg_logo = document.querySelector(".attryb-carousel-002-button-right > svg path");
left_scroll_button.style.display = "none";

let attrybFBTsectionWrapper = document.querySelector("#attryb-carousel-002-section-wrap");
let attrybFBTDataDisplay = attrybFBTsectionWrapper.getAttribute('data-template-display');
attrybFBTDataDisplay = JSON.parse(attrybFBTDataDisplay);

function convertDomToString(domObject) {
  if (domObject) {
    const serializer = new XMLSerializer();
    const htmlString = serializer.serializeToString(domObject);
    return htmlString;
  }
}

function replacePlaceholders(targetProductArray, template) {
  const regex = /\${{(.*?)}}/g;
  const replacedStrings = targetProductArray.map((item) => {
    return template.replace(regex, (match, key) => {
      if (item.hasOwnProperty(key)) {
        return item[key];
      }
      return match;
    });
  });
  return replacedStrings;
}

const comouted_style_for_scroll_content = window.getComputedStyle(scroll_content);
const comouted_style_for_card_container = window.getComputedStyle(card_container);

//get the value of card_width and card_gap & convert the string to number (e.g "16px" to 16)
const card_width = parseFloat(comouted_style_for_card_container.getPropertyValue("width"));
const card_gap = parseFloat(comouted_style_for_scroll_content.getPropertyValue("gap"));
const scroll_value = card_width + card_gap //400+16

scroll_content.innerHTML = replacePlaceholders(attrybFBTDataDisplay, convertDomToString(card_container)).join("");

//left button disable
function disable_left_button() {
    left_scroll_button.style.display = "none";
}

//left button enable
function enable_left_button() {
    left_scroll_button.style.display = "flex";
    //right_scroll_button.style.stroke = "#D0D5DD"
}

//right button disable
function disable_right_button() {
    right_scroll_button.style.display = "none";
}

//right button enable
function enable_right_button() {
    right_scroll_button.style.display = "flex";
    //right_scroll_button.style.stroke = "#D0D5DD"
}



var scroll_width = scroll_content.scrollWidth;
var client_width = scroll_content.clientWidth;
var end_point = scroll_width - client_width ;

window.addEventListener("resize", ()=>{
  scroll_width = scroll_content.scrollWidth;
  client_width = scroll_content.clientWidth;
  end_point = scroll_width - client_width ;
})


scroll_content.addEventListener("scroll", () => {
    const scroll_left_pixel = scroll_content.scrollLeft;
    scroll_left_pixel === 0 ? disable_left_button() : enable_left_button();
    (end_point === scroll_left_pixel) ? disable_right_button() : enable_right_button();
})

left_scroll_button.addEventListener("click", () => {
    scroll_content.scrollLeft -= scroll_value;
})

right_scroll_button.addEventListener("click", () => {
    scroll_content.scrollLeft += scroll_value;
})

