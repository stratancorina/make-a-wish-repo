const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!Array.isArray(req.role)) {
          return res.sendStatus(401);
        }
    
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.role);
    
        const result = req.role.some((role) => rolesArray.includes(role));
        if (!result) return res.sendStatus(401);
        next();
      };
}

module.exports = verifyRoles