# Override Content-Type

This add-on allows user to set up a number of URL regular expressions and MIME types. Whenever a network request's URL matches a regular expression, it overrides the response Content-Type header with the configured MIME type. For instance, configure "www\.example\.com/download" => "application/pdf" will make Firefox treat file downloaded from "https://www.example.com/download/123" as a PDF file.
