<template>
  <footer>
    <div class="footer__content container">
      <div class="footer__content-wrapper">
        <div class="footer__content-items">
          <div class="footer__content-title">
            Services
          </div>
          <ul>
            <li><a href="#">Web design</a></li>
            <li><a href="#">Development</a></li>
            <li><a href="#">Hosting</a></li>
          </ul>
        </div>
        <div class="footer__content-items">
          <div class="footer__content-title">
            About
          </div>
          <ul>
            <li><a href="#">Company</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__content-text">
        <div class="footer__content-title">
          Company Name
        </div>
        <div class="footer__content-description">
          Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus
          elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
footer {
  background-color: #101820;
  padding-top: 80px;
  padding-bottom: 80px;
}

.footer__content-wrapper {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 15px;
}

.footer__content-title {
  color: #fff;
  font-family: "OpenSans";
  margin-bottom: 12px;
  font-weight: 800;
  font-size: 16px;
}

.footer__content-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__content-items > ul {
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  align-items: center;
}

.footer__content-items > ul > li {
  color: #fff;
  list-style-type: none;
  text-decoration: none;
  opacity: 0.6;
}

.footer__content-items > ul > li > a {
  color: #fff;
  text-decoration: none;
}

.footer__content-items > ul > li > a:hover {
  opacity: 0.7;
}

.footer__content-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__content-title {
  text-align: center;
}

.footer__content-description {
  text-align: center;
  opacity: 0.6;
  color: #fff;
  width: 510px;
}
</style>
