package main

import (
	"encoding/json"
	"net/http"
	"log"
	"errors"
	"io"
)

type calc_req struct {
	Mode int
	BeforeVat, AfterVat, VatRate float64
}

func calculator(w http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var calc, result calc_req
	err := decoder.Decode(&calc)

    if err != nil && !errors.Is(err, io.EOF) {
        panic(err)
    }

	if calc.Mode == 1 {
		result.BeforeVat = calc.BeforeVat
		result.VatRate = calc.VatRate
		result.AfterVat = calc.BeforeVat + (calc.BeforeVat * (calc.VatRate / 100))
	}
	if calc.Mode == 2 {
		result.AfterVat = calc.AfterVat
		result.VatRate = calc.VatRate
		result.BeforeVat = calc.AfterVat / (1 + (calc.VatRate / 100))
	}
	if calc.Mode == 3 {
		result.AfterVat = calc.AfterVat
		result.BeforeVat = calc.BeforeVat
		result.VatRate = (calc.AfterVat - calc.BeforeVat) * (100 / calc.BeforeVat)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	encoder := json.NewEncoder(w)
	encoder.Encode(&result)
}

func main() {
	http.HandleFunc("/calc", calculator)
	log.Fatal(http.ListenAndServe(":8080", nil))
}