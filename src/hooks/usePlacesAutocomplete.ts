import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "@material-ui/core";
import { Suggestion } from "types";

const usePlacesAutocomplete = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const autocomplete = useRef();

  if (!autocomplete.current) {
    // @ts-ignore
    autocomplete.current = new window.google.maps.places.AutocompleteService({
      types: ["(cities)"],
    });
  }

  const getPlace = (input: string) => {
    if (!input) {
      return [];
    }
    // @ts-ignore
    autocomplete.current.getPlacePredictions(
      { input, types: ["(cities)"] },
      (predictions: any) => {
        setLoading(true);
        const suggestionsResult = predictions.map(
          ({ structured_formatting }: any) => ({
            title: structured_formatting.main_text,
            subTitle: structured_formatting.secondary_text,
          })
        );
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
