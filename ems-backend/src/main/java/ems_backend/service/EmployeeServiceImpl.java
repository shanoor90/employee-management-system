package ems_backend.service;

import ems_backend.dto.EmployeeDto;
import ems_backend.entity.Employee;
import ems_backend.exception.ResourceNotFoundException;
import ems_backend.mapper.EmployeeMapper;
import ems_backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.hibernate.internal.build.AllowNonPortable;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updateEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee in not exists with given Id:"+employeeId));
        employee.setFirstName(updateEmployee.getFirstName());
        employee.setLastName(updateEmployee.getLastName());
        employee.setEmail(updateEmployee.getEmail());
        Employee updatedEmployee=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);

    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee=employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exists with given Id :"+ employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);


    }
    @Override
    public List<EmployeeDto> getAllEmployees(){
        List<Employee> employees =employeeRepository.findAll();
        return employees.stream().map((employee ) -> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto){
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee createEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(createEmployee);
        


    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee in not exists with given Id:"+employeeId));

            employeeRepository.deleteById(employeeId);
    }

}
