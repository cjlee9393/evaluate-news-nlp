FROM node
WORKDIR /home/node
ADD evaluate-news-nlp ./evaluate-news-nlp

WORKDIR /home/node/evaluate-news-nlp
RUN npm install --force
RUN npm install cors --force
RUN npm install mocha --force
RUN npm run build-prod
ENTRYPOINT ["bash"]
