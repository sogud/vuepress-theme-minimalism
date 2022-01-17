<template>
  <footer class="footer">
    <div class="footer-left-wrap">
      <ul
        v-if="links"
        class="links"
      >
        <li
          v-for="item in links"
          :key="item.link"
          class="links-item"
        >
          <NavLink :link="item.link">{{ item.text }}</NavLink>
        </li>
      </ul>
    </div>
    <div class="footer-right-wrap">

    </div>
  </footer>
</template>

<script>


export default {
  components: {


  },

  computed: {
    copyright() {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.linksRight) || []
      )
    },
    links() {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.links) || []
      )
    },
  },

  methods: {

  },
}
</script>

<style lang="stylus" scoped>
ol, ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer {
  min-height: 60px;
  max-width: $contentWidth;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;

  .footer-left-wrap {
    line-height: 30px;
    flex: 1;
    display: flex;

    .links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .links-item {
        margin-right: 10px;

        a {
          font-size: 16px;
          color: $footerColor;
          text-decoration: none;
          transition: color 0.3s;
        }
      }
    }
  }

  .footer-right-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $MQNarrow) {
      justify-content: flex-end;
    }

    .links {
      display: flex;
      justify-content: flex-end;

      .links-item {
        flex: 0 0 auto;
        padding: 0 10px;
        position: relative;
        line-height: 12px;
        border-right: 1px solid $footerColor;
        font-size: 12px;
        color: $footerColor;

        &:last-child {
          border-right: none;
        }

        a {
          color: currentColor;
          text-decoration: none;
          transition: color 0.3s;

          &:hover {
            color: rgba(255, 255, 255, 0.9);
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .footer {
    min-height: 100px;
    flex-direction: column;

    .footer-left-wrap {
      align-items: center;
      justify-content: center;
    }

    .footer-right-wrap {
      .copyright {
        display: block;

        .copyright-item {
          line-height: 1;
          border-right: none;
          text-align: center;
        }
      }
    }
  }
}
</style>
