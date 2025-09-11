import React, { createContext, Children } from 'react';
import PropTypes from 'prop-types';
import Theme from './Theme';

// Create a modern context internally
const ThemeContext = createContext(null);

/**
 * Provides a theme to child components through context.
 * Uses modern React features internally but maintains legacy API compatibility.
 */
export default class StyleProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };


  constructor(props) {
    super(props);
    this.state = {
      theme: this.createTheme(props),
    };
  }


  // Replace unsafe lifecycle with getDerivedStateFromProps
  static getDerivedStateFromProps(nextProps, prevState) {
    // Only update if style changed
    if (nextProps.style !== prevState.lastStyle) {
      return {
        theme: new Theme(nextProps.style),
        lastStyle: nextProps.style
      };
    }
    return null;
  }

  createTheme(props) {
    return new Theme(props.style);
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    // Use modern context internally
    return (
      <ThemeContext.Provider value={{ theme }}>
        {Children.only(children)}
      </ThemeContext.Provider>
    );
  }
}

// These exports allow using modern patterns for new components
// without breaking backward compatibility
export const ThemeConsumer = ThemeContext.Consumer;
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a StyleProvider');
  }
  return context.theme;
};

// Also export the raw context for class-based consumers
export { ThemeContext };
