# Integration Steps

The integrations listed below are built-in to the extension and have their own UI for editing steps.

{% for plugin in plugins %}
**[{{ plugin.label }}](../plugins/{{ plugin.idPrefix }})**

{{ plugin.description | safe }}
({{ plugin.idPrefix }})

{% endfor %}
