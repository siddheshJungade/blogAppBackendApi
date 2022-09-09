

export const routLog = (req,res,next) => {
    console.log(`${req.method} -- ${req.route}  ${req.ip}` )
    next();
}