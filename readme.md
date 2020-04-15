# Minimal example of a web cache poisoning attack

Consider:

1. Attacker visits http://localhost:3000/random/299?tracking_id='><script>alert("XSS")</script>
	Note:	tracking_id is XSSable and included in the cached data
		299 is the key to an empty cache entry	
2. Victim visits http://localhost:3000/random/299 and is served stored XSS
	Note:	Browser protections don't help (since stored)
		No requirement that attacker communicate the URL to the victim
