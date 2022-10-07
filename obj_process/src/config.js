import dotenv from 'dotenv';
import yargs from 'yargs';
dotenv.config();

const args = yargs(process.argv.slice(2))
    .alias({
        p: 'puerto'
    })
    .default({
        puerto: 8080,
    })
    .argv


console.log(args);

export default {
    mongodb: {
        uriSTR: process.env.DB_URI_STRING
    },
    firebase:{
        ServiceAccount:{
            "type": "service_account",
            "project_id": "pruebafire-abe04",
            "private_key_id": "2061ae155fc852ff676494225eb35d96f6907cdc",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYVP51cEd2rnA2\nABf2VFBZNpMXYKkXPWvvF31PRerUwyYnZA78OGEumiMXO5d3oaYn1uUhJbjyXT/j\ntnnYMbJdWbBzis147BBWpG6yvBr1Qa02MSsDawblR7Z0LHAm2lpZ74q0geuvvHil\nYlT4qyHkurv0Yrs359n24jpLVXLnXGktapSGxk/e20exe0pv30C3gkYas/CHQCk0\nu1kKnM4gbfNrpie5aeLMCLNmlRyoDBE8HneKk24KfOuHUa5K0W/Mw66595PczcG4\n1MityfNsVSrDEfg+sB6NRpIs+lXtm8DXhVRr9lFgEJpUV2pSWUsfmq9NBCDmCq0Y\nzdsdVUJ3AgMBAAECggEADPHxFB1MOXQwxMUhVJ0w/asABvXCyIrlYDZF9QNtt55B\n3zjj6KswWDXjBFXi4hwV3EEbZENkm3mBruJRd41pwJ+dqRxU3/fdoRb6hM7ax3L5\npsovFRJHebAz4SRzmu+VWS0LXh0peaehNIxQzLHjjP4GQevSi4Lf48p1II2UGvdW\n09QhsWHkr0KS9hkZCuLbsVJZossmFdFA8UIqYlFcyJkfDf3f7eExnyEckrxuHf1k\npCiSQmx20g6Zdfbw0iGZIlJ3HfSFuu14zbpA3h80wu2wgC7+KvQzUG9epUPtW6yq\nlufGiqSDnKZ4LidTh5voxwyX4xvoC3Zr63wkH9TpyQKBgQDz55hZ4ejDhIe+d2ls\nJneDJbtz8aU3jZcZS5btl86X8GsW7LonTTj4PzzTzp73iUJQygw8wOds2I2t9fuM\nVSWoG1UAUkkNsEDVYdpjE9PHhBooHk0Ovw7dlQffRr5exFKt4ivn86XSv1/Lohbj\n5T6DUT7KbOvEFiatbkb8hqvqfQKBgQDjD1wmZVrVtzjo5x5vpBVX2p/f0OFn0I5x\nusQMdWlUBbeNgGf4bmF47Dqgb5NjbwaBp8J5yB+Nnkp81EObi/rQmRDvQ6Zc9DlM\nIjUsgHn55Sedy/2z/trrrLd69TX8BJNdiMR+nKCYqby+HlHo6ejypzYUjEqNM+kA\nCslkUuv/AwKBgQDs+oywaCr8LPynNuabShS8vCCR2quoek3hKeyPFPyJ6/Jg58lG\n/mTn7qlvMkaKRDbGwEl7jgJNY2rlJycthl18JHJGSazpO+MCcHz73vvZ0qSHbkl4\nlnIfIPnxGo9FDIM4p5P5XmYzifXNqMOM0eQXOw1DKOk6MDuMLqWSHldTEQKBgQDd\nK5AKQn3pYPCJRN9LxduYWPeTzuZQ9kBaHZ9rt05irrLtnV8pCXPektREhIpft7zx\nvFRdxYaerspFr4kvUXl9iSuKtC2vq6DIPSXodDjcJs+hEBvPIXdjSzjqB0KPenGF\nEXy9C5oPOn8D/Yqxwm7LNf8iosjXo/HYvakQFQmVuwKBgBJyYjZwgvm7/b3ul3Cl\nkzvQmITE9gQnQG3Tz7dmzHnHQUAmprm796ipDL6MJxyq+juPAlKhmbEP1DqV1D6D\ncAgo1YsqTYVgG5NcM5p4oqgRd6tZ5+ShgYRA7HN3evCHdmJlMBhR0KMT4yjxAK5r\n1poD9HFCgTe2KPJRj0rkVZcF\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-1sbdf@pruebafire-abe04.iam.gserviceaccount.com",
            "client_id": "110800704312096363867",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1sbdf%40pruebafire-abe04.iam.gserviceaccount.com"
          },
          collection: 'mensajes'          
    },

    local: {
        arch: 'mensajes'
    },
    args: args
}