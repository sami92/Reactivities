using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }  
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _phototAccesor;
            private readonly IUserAccessor _userAccesor;

            public Handler(DataContext context,IPhotoAccessor phototAccesor ,IUserAccessor userAccesor) {
                _context = context;
                _phototAccesor = phototAccesor;
                _userAccesor = userAccesor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p=>p.Photos)
                    .FirstOrDefaultAsync(x=>x.UserName == _userAccesor.GetUsername());

                if (user == null) return null;
                
                var photo = user.Photos.FirstOrDefault(x=>x.Id ==request.Id);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failure("Cant Delete Main photo");

                var result = await _phototAccesor.DeletePhoto(photo.Id);

                if (result == null) Result<Unit>.Failure("Problem with delete photo from cloud");

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync()>0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem with delete photo from Api");
            }
        }
    }
}
