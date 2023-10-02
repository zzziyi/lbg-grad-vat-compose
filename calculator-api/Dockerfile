FROM golang:1.21-alpine AS build

COPY . .

ENV GOPATH=/tmp

RUN go mod download

RUN go build -o /bin/app

FROM alpine

COPY --from=build /bin/app ./app

ENTRYPOINT ["./app"]