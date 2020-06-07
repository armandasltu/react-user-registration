import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "@material-ui/core";
import { Suggestion } from "types";

type StructuredFormatting = {
  main_text: string;
  secondary_text: string;
};

type Prediction = {
  types: string[];
  structured_formatting: StructuredFormatting;
};

const usePlacesAutocomplete = (type: string) => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const getTypes = (type: string = "") => {
    if (type === "city") {
      return ["(cities)"];
    }
    return "";
  };

  const autocomplete = useRef();

  if (!autocomplete.current) {
    // @ts-ignore
    autocomplete.current = new window.google.maps.places.AutocompleteService({
      types: getTypes(type),
    });
  }

  const getPlace = (input: string) => {
    if (!input) {
      return [];
    }

    // @ts-ignore
    autocomplete.current.getPlacePredictions(
      { input, types: getTypes(type) },
      (predictions: any) => {
        if (!predictions) {
          return [];
        }
        setLoading(true);
        const suggestionsResult = predictions
          .filter((prediction: Prediction) => {
            switch (type) {
              case "street":
                return prediction.types.includes("route");
              case "country":
                return prediction.types.includes("country");
              default:
                return true;
            }
          })
          .map(({ structured_formatting }: Prediction) => ({
            title: structured_formatting.main_text,
            subTitle: structured_formatting.secondary_text,
          }));
        setSuggestions(suggestionsResult);
        setLoading(false);
      }
    );
  };

  const debouncedGetPlace = useCallback(debounce(getPlace, 500), []);

  useEffect(() => {
    debouncedGetPlace(value);
  }, [debouncedGetPlace, value]);

  return {
    loading,
    value,
    suggestions,
    actions: {
      setValue,
      clearSuggestions: () => {
        setSuggestions([]);
      },
    },
  };
};

export default usePlacesAutocomplete;
