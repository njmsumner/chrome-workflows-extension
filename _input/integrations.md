# Integration Steps

{% for plugin in plugins %}
**[{{ plugin.label }}](../plugins/{{ plugin.idPrefix }})**

{{ plugin.idPrefix }} - {{ plugin.description | safe }}

{% endfor %}
