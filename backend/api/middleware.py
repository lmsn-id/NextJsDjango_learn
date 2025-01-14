from datetime import datetime
from rest_framework_simplejwt.tokens import OutstandingToken, BlacklistedToken

class CustomTokenMiddleware:
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            current_date = datetime.now().date()
            last_login_date = request.session.get('last_login_date')

            if last_login_date and last_login_date != current_date.isoformat():
                self.blacklist_user_tokens(request.user)
                request.session['last_login_date'] = current_date.isoformat()
        
        response = self.get_response(request)
        return response

    def blacklist_user_tokens(self, user):
        tokens = OutstandingToken.objects.filter(user=user)
        for token in tokens:
            try:
                BlacklistedToken.objects.get_or_create(token=token)
            except Exception as e:
                print(f"Error blacklisting token: {e}")