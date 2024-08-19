function getStars(rank) {
  rank = Math.round(rank * 2) / 2;
  let stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rank) {
      stars.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    } else if (i - 0.5 === rank) {
      stars.push('<i class="fa-solid fa-star-half" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    } else {
      stars.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    }
  }
  return stars.join('');
}
