cd ..
yarn install
yarn build
aws s3 sync build s3://fv-website.chelem
