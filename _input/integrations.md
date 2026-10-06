# Integration Steps

{% for plugin in plugins %}
**[{{ plugin.label }}](../plugin/{{ plugin.idPrefix }})**

{{ plugin.idPrefix }} - {{ plugin.description | safe }}

{% endfor %}
