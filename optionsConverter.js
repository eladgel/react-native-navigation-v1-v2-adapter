import {generateGuid} from './utils';

export function convertStyle(style = {}, buttons = {}) {
  style = {...style, ...style.navigatorStyle}
    if (style.navigatorButtons) {
      buttons = convertButtons(style.navigatorButtons);
    }
  return {
    screenBackgroundColor: style.screenBackgroundColor,
    orientation: style.orientation,
    statusBar: {
      blur: style.statusBarBlur,
      hideWithTopBar: style.statusBarHideWithNavBar,
      style: style.statusBarTextColorScheme,
      hidden: style.statusBarHidden
    },
    popGesture: style.disabledBackGesture ? !style.disabledBackGesture : undefined,
    backgroundImage: style.screenBackgroundImageName,
    rootBackgroundImage: style.rootBackgroundImageName,
    modalPresentationStyle: style.modalPresentationStyle,
    topBar: {
      visible: style.navBarHidden ? !style.navBarHidden : undefined,
      hideOnScroll: style.navBarHideOnScroll,
      buttonColor: style.navBarButtonColor,
      translucent: style.navBarTranslucent,
      transparent: style.navBarTransparent,
      drawBehind: style.drawUnderNavBar,
      noBorder: style.navBarNoBorder,
      blur: style.navBarBlur,
      largeTitle: style.largeTitle,
      backButtonImage: style.backButtonImage,
      // backButtonHidden: style.?,
      // backButtonTitle: style.?,
      hideBackButtonTitle: style.hideBackButtonTitle,
      // component: ,
      ...buttons,
      title: {
        text: style.title,
        fontSize: style.navBarTextFontSize,
        color: style.navBarTextColor,
        fontFamily: style.navBarTextFontFamily,
        component: {
          name: style.navBarCustomView,
          alignment: style.navBarComponentAlignment,
          passProps: style.navBarCustomViewInitialProps
        }
      },
      subtitle: {
        text: style.subtitle,
        fontSize: style.navBarSubtitleFontSize,
        color: style.navBarSubtitleColor,
        fontFamily: style.navBarSubtitleFontFamily,
        // alignment: style.?
      },
      background: {
        color: style.navBarBackgroundColor,
        // component: {
        //   // name: style.?
        // }
      }
    },
    bottomTab: {
      title: style.label,
      // badge: style.badge,
      testID: style.testID,
      icon: style.icon,
      selectedIcon: style.selectedIcon,
      iconInsets: style.iconInsets
    },
    bottomTabs: {
      visible: !style.tabBarHidden
    },
    // sideMenu: {
    //   left: {
    //     visible: false,
    //     enabled: true
    //   },
    //   right: {
    //     visible: false,
    //     enabled: true
    //   }
    // },
    // overlay: {
    //   interceptTouchOutside: true
    // }
  };
}

export function convertButtons(buttons) {
  return {
    leftButtons: buttons.leftButtons ? processButtonsArray(buttons.leftButtons) : [],
    rightButtons: buttons.rightButtons ? processButtonsArray(buttons.rightButtons) : []
  };
}

function processButtonsArray(buttons) {
  return buttons.map((button) => {
    if (typeof button.component === 'string') {
      button.component = {
        name: button.component,
        passProps: button.passProps
      };
      button.id = button.id ? button.id : generateGuid();
    }
    button.enabled = !button.disabled;

    return button;
  });
}
