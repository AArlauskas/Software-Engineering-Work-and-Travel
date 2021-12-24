package wt.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import wt.backend.dtos.UserDto;
import wt.backend.models.User;
import wt.backend.repositories.UsersRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UsersService implements UserDetailsService {
    @Autowired
    private UsersRepository usersRepository;

    public List<User> getAllUsers()
    {
        return usersRepository.findAll();
    }

    public User createUser(UserDto userDto)
    {
        return usersRepository.save(new User(userDto));
    }

    public User getAuthUser(UserDetails details)
    {
        return usersRepository.findByEmailAndPassword(details.getUsername(),details.getPassword());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = usersRepository.findByEmail(username);
        if(user == null) throw new UsernameNotFoundException("Invalid email or password");
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return authorities;
    }

    public boolean isEmailUnique(String email)
    {
        try
        {
            return usersRepository.findByEmail(email) == null;
        }
        catch (Exception e)
        {
            return  false;
        }
    }
}
