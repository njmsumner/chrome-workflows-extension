# Integration Steps

{% for plugin in plugins %}
**[{{ plugin.label }}](../plugins/{{ plugin.idPrefix }})**

{{ plugin.description | safe }}
({{ plugin.idPrefix }})

{% endfor %}
