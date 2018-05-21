exports.getServerErrors = (errObj) => {
  if (errObj && errObj.errors) {
    const { errors } = errObj;
    const retObj = {};
    Object.keys(errors).forEach((item) => {
      const key = errors[item].name;
      if (!retObj[key]) {
        retObj[key] = [
          errors[item].message
        ];
      } else {
        retObj[key].push(errors[item].message);
      }
    });
    return retObj;
  }
  return undefined;
};
