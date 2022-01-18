import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

function NumberMask(props) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        guide={false}
        placeholder={'(  )'}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

function PhoneMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      guide={false}
      placeholder={'(  )'}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function ZipcodeMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      guide={false}
      placeholder={'ex: 12345-678'}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-',/[0-9]/, /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function CNPJMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      guide={false}
      placeholder={'ex: 12.345.678/9010-11'}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.',/[0-9]/, /[0-9]/, /[0-9]/,'/',/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}


NumberMask.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

PhoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

ZipcodeMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

CNPJMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


export {NumberMask, ZipcodeMask, CNPJMask, PhoneMask};