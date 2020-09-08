const fs = require('fs')
const yargs = require('yargs')
const nodeEnv = process.env.NODE_ENV || 'development'
const appDirectory = fs.realpathSync(process.cwd())
const dotenvFiles = [`.env.${nodeEnv}.local`, `.env.${nodeEnv}`].map(
  f => `${appDirectory}/${f}`
)

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile
      })
    )
  }
})

process.stdout.write(process.env[yargs.argv.value])
