import {generateNavigator} from './navigatorBridge';
import * as optionsConverter from './optionsConverter';

export function convertSingleScreen(screen, drawer, components) {
  if (drawer) {
    return convertDrawer(convertSingleScreen(screen), convertComponent(drawer.left), convertComponent(drawer.right));
  }

  return convertComponentStack(screen, components);
}

export function convertBottomTabs(tabs, drawer) {
  if (drawer) {
    return convertDrawer(convertBottomTabs(tabs), convertComponent(drawer.left), convertComponent(drawer.right));
  }

  return {
    bottomTabs: {
      children: tabs.map((tab) => {
        return convertComponentStack(tab, tab.components);
      })
    }
  };
}

export function convertComponent(oldComponent) {
  if (!oldComponent) {
    return undefined;
  }

  oldComponent = Object.assign(oldComponent, oldComponent.navigatorStyle);

  const navigator = generateNavigator(oldComponent.id);
  const component = {
    id: oldComponent.id ? oldComponent.id : navigator.id,
    name: oldComponent.screen,
    passProps: {
      navigator,
      ...oldComponent,
      ...oldComponent.passProps,
      componentId: navigator.id
    },
    options: optionsConverter.convertStyle(oldComponent)
  };

  return {component};
}


export function convertComponentStack(oldComponent, components) {
  const componentsArray = [];
  if (components) {
    components.forEach((component) => {
      componentsArray.push(convertComponent(component));
    });
  } else {
    componentsArray.push(convertComponent(oldComponent));
  }

  return {
    stack: {
      children: componentsArray,
      options: {
        bottomTab: optionsConverter.convertStyle(oldComponent).bottomTab
      }
    }
  };
}

function convertDrawer(center, left, right) {
  return {
    sideMenu: {
      center,
      left,
      right
    }
  };
}
